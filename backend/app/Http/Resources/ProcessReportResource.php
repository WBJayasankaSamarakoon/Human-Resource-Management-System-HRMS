<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProcessReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'month' => $this->month,
            'emp_id' => $this->emp_id,
            'name' => $this->name,
            'no_pay_count' => $this->no_pay_count,
            'days_worked' => $this->days_worked,
            'leave_days' => $this->leave_days,
            'holidays' => $this->holidays,
            'late_hours' => $this->late_hours,
            'post_approve_leave' => $this->post_approve_leave,
            'pre_approve_leave' => $this->pre_approve_leave,
            'basic_salary' => $this->basic_salary,
            'BRA1' => $this->BRA1,
            'BRA2' => $this->BRA2,
            'AttendanceIncentive' => $this->AttendanceIncentive,
            'SuperAttendance' => $this->SuperAttendance,
            'PerformanceIncentive' => $this->PerformanceIncentive,
            'additional' => $this->additional,
            'advance' => $this->advance,
            'stock' => $this->stock,
            'total_allowances' => $this->total_allowances,
            'total_deductions' => $this->total_deductions,
            'gross_salary' => $this->gross_salary,
            'net_salary' => $this->net_salary,
            'created_at' => $this->created_at,
        ];
    }
}
