<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{

    public function index()
    {
        return Machine::all();
    }


    public function show($id)
    {
        return Machine::findOrFail($id);
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'Name' => 'required|string|max:255',
            'Model' => 'required|string|max:255',
            'Brand' => 'required|string|max:255',
        ]);


        return Machine::create($validated);
    }


    public function update(Request $request, $id)
    {
        $machine = Machine::findOrFail($id);


        $validated = $request->validate([
            'Name' => 'string|max:255',
            'Model' => 'string|max:255',
            'Brand' => 'string|max:255',
        ]);


        $machine->update($validated);

        return $machine;
    }

    // Delete a machine
    public function destroy($id)
    {
        $machine = Machine::findOrFail($id);
        $machine->delete();

        return response()->json(['message' => 'Machine deleted successfully']);
    }
}
