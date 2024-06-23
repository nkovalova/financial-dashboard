const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
export function getLastThreeMonths(): { id: string, value: string }[] {
    const date = new Date();
    const months: { id: string, value: string }[] = [];

    for (let i = 0; i < 3; i++) {
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];
        
        const id = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
        const value = `${monthName} ${year}`;
        
        months.push({ id, value });
        
        date.setMonth(monthIndex - 1);
    }

    return months;
}