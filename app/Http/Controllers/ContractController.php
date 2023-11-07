<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use App\Models\Contract;
use App\Models\ContractLeg;
use App\Services\Airports\GetAirportsNearAirport;
use App\Services\Airports\GetAirportWeather;
use App\Services\Contracts\GenerateContracts;
use App\Services\Contracts\StoreContracts;
use Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    public function getContracts(
        string $icao,
        GetAirportsNearAirport $getAirportsNearAirport,
        GenerateContracts $generateContracts,
        StoreContracts $storeContracts,
        GetAirportWeather $getAirportWeather
    ): RedirectResponse|Response {

        if (!$icao) {
            return Inertia::render('Airports/AirportDetail');
        }

        $icao = strtoupper($icao);
        if (Cache::has($icao)) {
            $airport = Cache::get($icao);
        } else {
            $airport = Airport::where('identifier', $icao)->first();
            Cache::put($icao, $airport, now()->addHours(23));
        }

        if (!$airport) {
            return redirect()->back()->with(['error' => 'Airport not found']);
        }

        // $metar = $getAirportWeather->execute($icao);

        $currentContracts = $this->getCurrentContracts($icao);
        if ($currentContracts->count() < 10) {
            $airports = $getAirportsNearAirport->execute($airport);
            $contracts = $generateContracts->execute($airport, 10 - $currentContracts->count(), $airports);
            $storeContracts->execute($contracts);
            $currentContracts = $this->getCurrentContracts($icao);
        }

        return Inertia::render('Contracts/Search', ['airport' => $airport, 'contracts' => $currentContracts]);
    }

    public function acceptContract(Request $request): RedirectResponse
    {
        $contract = Contract::find($request->id);
        $contract->accepted_by = Auth::user()->id;
        $contract->is_available = false;
        $contract->save();

        return redirect()->back()->with(['success' => 'Contract accepted']);
    }

    public function shareContract(Request $request): RedirectResponse
    {
        $contract = Contract::find($request->id);
        $contract->is_shared = true;
        $contract->save();

        return redirect()->back()->with(['success' => 'Contract accepted']);
    }

    public function returnContract(Request $request): RedirectResponse
    {
        $legs = ContractLeg::where('contract_id', $request->id)
            ->where('user_id', !null)
            ->count();
        if ($legs > 0) {
            return redirect()->back()->with(['error' => 'This contract cannot be returned. It belongs to a dispatch']);
        }
        $contract = Contract::find($request->id);
        $contract->accepted_by = null;
        $contract->is_available = true;
        $contract->save();

        return redirect()->back()->with(['success' => 'Contract returned']);
    }

    protected function getCurrentContracts(string $icao): Collection|array
    {
        return Contract::with('originAirport', 'contractLegs', 'contractLegs.depAirport', 'contractLegs.arrAirport')
            ->where('origin_airport_id', $icao)
            ->where('is_available', true)
            ->get();
    }
}
