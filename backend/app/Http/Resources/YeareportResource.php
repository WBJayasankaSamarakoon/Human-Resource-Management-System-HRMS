<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class YeareportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'year' => $this->year,
            'month' => $this->month,
            'emp_id' => $this->emp_id,
            'name' => $this->name,
            'no_pay_count' => $this->no_pay_count,
            'leave_days' => $this->leave_days,
            'holidays' => $this->holidays,
            'late_hours' => $this->late_hours,
            'days_worked' => $this->days_worked,
            'post_approve_leave' => $this->post_approve_leave,
            'pre_approve_leave' => $this->pre_approve_leave,
            'basic_salary' => $this->basic_salary,
            'bra1' => $this->bra1,
            'bra2' => $this->bra2,
            'attendance_incentive' => $this->attendance_incentive,
            'super_attendance' => $this->super_attendance,
            'performance_incentive' => $this->performance_incentive,
            'additional' => $this->additional,
            'advance' => $this->advance,
            'stock' => $this->stock,
            'total_allowances' => $this->total_allowances,
            'total_deductions' => $this->total_deductions,
            'gross_salary' => $this->gross_salary,
            'net_salary' => $this->net_salary,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
