<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EventsController extends Controller
{
    // Fetch all events
    public function index(): JsonResponse
    {
        $events = Events::all();
        return response()->json($events, 200);
    }

    // Store a new event
    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request
        $request->validate([
            'Title' => 'required|string|max:255',
            'Date' => 'required|date',
        ]);

        // Create a new event
        $event = Events::create([
            'Title' => $request->Title,
            'Date' => $request->Date,
        ]);

        return response()->json($event, 201);
    }

    // Delete an event
    public function destroy($id): JsonResponse
    {
        $event = Events::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $event->delete();
        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}
