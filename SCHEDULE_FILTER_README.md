# Schedule ID Filter Implementation

## Overview
The scheduleId filter allows users to filter travel bookings by specific schedules. This feature is available to users with admin, transporter, or school roles.

## Features

### 1. Transporter Selection
- Users can select a specific transporter from a dropdown
- Only available to users with appropriate permissions (admin, transporter, school)
- When a transporter is selected, their schedules are automatically loaded

### 2. Schedule Filter
- Dropdown showing all available schedules for the selected transporter
- Displays schedule information in format: "Departure → Destination (Time)"
- Loading state while schedules are being fetched
- Disabled state when no transporter is selected

### 3. Permission-Based Access
The schedule filter is only shown to users with the following roles:
- `admin`
- `transporter` 
- `school`

### 4. API Integration
- Fetches transporters from: `GET /transporters`
- Fetches schedules from: `GET /transporters/{transporterId}/schedules`
- Filters bookings using: `GET /travels?scheduleId={scheduleId}`

## Usage Flow

1. **User selects transporter** (optional)
2. **System loads schedules** for that transporter
3. **User selects schedule** from dropdown
4. **System filters bookings** by the selected schedule
5. **Results are displayed** in the booking table

## Components Updated

### FilterBar.tsx
- Added `scheduleIdFilter` and `setScheduleIdFilter` props
- Added `availableSchedules` prop for schedule options
- Added `showScheduleFilter` prop for conditional rendering
- Added `loadingSchedules` prop for loading state
- Added schedule filter dropdown with loading indicators

### schooltravels/page.tsx
- Added state management for transporters and schedules
- Added `fetchTransporters()` function
- Added `fetchTransporterSchedules()` function
- Added `handleTransporterChange()` function
- Added `shouldShowScheduleFilter()` function for permission checking
- Updated `buildQueryParams()` to include scheduleId
- Updated `clearAllFilters()` to clear schedule filter
- Added loading states and error handling

## Error Handling

- **404**: "No schedules found for this transporter"
- **401**: "Please log in again"
- **403**: "You do not have permission to view schedules"
- **500**: "Server error. Please try again later"
- **Network errors**: "Network error. Please check your connection"

## Loading States

- Transporter dropdown shows loading spinner when schedules are being fetched
- Schedule dropdown shows "Loading schedules..." and spinner
- Disabled states prevent user interaction during loading

## Filter Persistence

- Schedule filter is cleared when transporter changes
- All filters are cleared when "Clear All Filters" is clicked
- Filter state is maintained during component re-renders 