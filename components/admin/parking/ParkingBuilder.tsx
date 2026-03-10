"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { ParkingCanvas } from "./ParkingCanvas";
import { ParkingToolbar } from "./ParkingToolbar";
import { SlotProperties } from "./SlotProperties";
import { ParkingSlot } from "./ParkingSlotTypes";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  getParkingLayout,
  saveParkingLayout,
} from "@/app/actions/parkingExtensions";
type ParkingBuilderProps = {
  placeId: string;
};

export function ParkingBuilder({ placeId }: ParkingBuilderProps) {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  console.log(activeId);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setSelectedSlotId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;

    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          // Calculate new position based on delta
          // Note: This is simplified. Real logic needs to convert px delta to % or keep px.
          // For now, let's assume we store x/y in px for the builder and normalize later,
          // OR we use a fixed canvas size.
          // Let's stick to simple px offset for prototype.
          return {
            ...slot,
            x: slot.x + delta.x,
            y: slot.y + delta.y,
          };
        }
        return slot;
      }),
    );
    setActiveId(null);
  };

  const addSlot = (type: "CAR") => {
    const newSlot: ParkingSlot = {
      id: uuidv4(),
      label: `Slot ${slots.length + 1}`,
      x: 50, // Initial spawn position
      y: 50,
      width: 60,
      height: 100,
      rotation: 0,
      status: "AVAILABLE",
      placeId: placeId,
    };
    setSlots([...slots, newSlot]);
    setSelectedSlotId(newSlot.id);
  };

  const updateSlot = (id: string, updates: Partial<ParkingSlot>) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, ...updates } : slot)),
    );
  };

  const deleteSlot = (id: string) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
    if (selectedSlotId === id) setSelectedSlotId(null);
  };

  const handleSave = async () => {
    const result = await saveParkingLayout(placeId, slots);
    if (result.success) {
      toast.success("Layout saved successfully");
    } else {
      toast.error("Failed to save layout");
    }
  };

  // Load initial data
  useEffect(() => {
    const load = async () => {
      const loadedSlots = await getParkingLayout(placeId);
      if (loadedSlots && loadedSlots.length > 0) {
        setSlots(loadedSlots);
      }
    };
    load();
  }, [placeId]);

  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[createSnapModifier(10)]} // Snap to 10px grid
    >
      <div className="flex h-full w-full">
        {/* Left Toolbar */}

        {/* Center Canvas */}
        <div className="flex-1 relative bg-slate-50 border-r border-l overflow-hidden pt-10">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
            <ParkingToolbar onAddCheck={addSlot} />
          </div>
          <ParkingCanvas
            slots={slots}
            selectedParkingId={selectedSlotId}
            setSelectedParkingId={setSelectedSlotId}
          />
        </div>

        {/* Right Properties Panel */}
        <div className="w-80 bg-background p-4 border-l">
          {selectedSlot ? (
            <SlotProperties
              slot={selectedSlot}
              onUpdate={(updates) => updateSlot(selectedSlot.id, updates)}
              onDelete={() => deleteSlot(selectedSlot.id)}
            />
          ) : (
            <div className="text-center text-muted-foreground mt-10">
              Select a slot to edit properties
            </div>
          )}
        </div>
      </div>

      {/* Drag Overlay for smooth dragging visual (optional) */}
      {/* <DragOverlay>...</DragOverlay> */}
    </DndContext>
  );
}
