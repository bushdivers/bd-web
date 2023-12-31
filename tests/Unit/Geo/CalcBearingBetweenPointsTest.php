<?php

namespace Tests\Unit\Geo;

use App\Services\Geo\CalcBearingBetweenPoints;
use PHPUnit\Framework\TestCase;

class CalcBearingBetweenPointsTest extends TestCase
{
    protected CalcBearingBetweenPoints $calcBearingBetweenPoints;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->calcBearingBetweenPoints = app()->make(CalcBearingBetweenPoints::class);
    }

    /**
     * A basic unit test example.
     */
    public function test_bearing_calculated(): void
    {
        $bearing = $this->calcBearingBetweenPoints->execute(-6.36188, 143.23070, -6.14774, 143.65716, 0.00000);
        $this->assertIsInt($bearing);
        $this->assertEquals(63, $bearing);
    }
}
