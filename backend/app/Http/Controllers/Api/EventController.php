<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    // Display a listing of events
    public function index(): JsonResponse
    {
        $events = Event::all();
        return response()->json($events, 200);
    }

    // Store a newly created event
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'Title' => 'required|string|max:255',
            'Date' => 'required|date',
        ]);

        $event = Event::create($request->all());
        return response()->json($event, 201);  // HTTP 201 for successful creation
    }

    // Display the specified event
    public function show($id): JsonResponse
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        return response()->json($event, 200);
    }

    // Update the specified event
    public function update(Request $request, $id): JsonResponse
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $request->validate([
            'Title' => 'required|string|max:255',
            'Description' => 'nullable|string',
            'Date' => 'required|date',
            'StartTime' => 'nullable|date_format:H:i:s',
            'EndTime' => 'nullable|date_format:H:i:s',
            'Location' => 'nullable|string|max:255',
        ]);

        $event->update($request->all());

        return response()->json($event, 200);
    }

    // Remove the specified event
    public function destroy($id): JsonResponse
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}
