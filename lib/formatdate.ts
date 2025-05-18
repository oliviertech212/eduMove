

  // Helper function to format ISO date for display
 export const formatDate = (isoDateString:any) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  