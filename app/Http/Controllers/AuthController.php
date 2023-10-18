<?php

namespace App\Http\Controllers;

use App\Enums\AirlineTransactionTypes;
use App\Enums\UserTransactionTypes;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Finance\AddAirlineTransaction;
use App\Services\Finance\AddUserTransaction;
use App\Services\User\CreateUserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function getLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function getRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function register(
        RegisterRequest $request,
        CreateUserService $createUserService,
        AddUserTransaction $addUserTransaction,
        AddAirlineTransaction $addAirlineTransaction
    ): RedirectResponse {
        $user = $createUserService->execute($request->name, $request->email, $request->password);
        if ($user) {
            $addAirlineTransaction->execute(AirlineTransactionTypes::PILOT_BONUS, -200.00, 'Pilot Bonus');
            $addUserTransaction->execute(UserTransactionTypes::BONUS, 200.00, $user->id);
            return redirect()->to('login')->with(['success' => 'Registered successfully']);
        }
        return redirect()->back()->with(['error' => 'Error Registering']);
    }

    public function login(LoginRequest $request): RedirectResponse
    {
        if (
            Auth::attempt([
                'email' => $request->email,
                'password' => $request->password,
                'is_active' => true
            ], true)
        ) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }
        return redirect()->back()->with([
            'error' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->to('/login');
    }
}
