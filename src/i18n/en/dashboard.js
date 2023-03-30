export const dashboard = () => {
  return {
    datetime: {
      today: 'Today',
      yesterday: 'Yesterday',
      this_week: 'This Week',
      last_week: 'Last Week',
      this_month: 'This Month',
      last_month: 'Last Month',
      last_two_months: 'Last Two Months',
      last_three_months: 'Last Three Months',
      last_six_months: 'Last Six Months',
      custom: 'Custom'
    },
    updated: 'Updated',
    addReport: 'Add Report',
    reports: {
      open: 'Open Work Orders',
      completed: 'Completed Work Orders',
      in_progress: 'In Progress Work Orders',
      open_by_trade: 'Open Work Orders By Trade',
      completed_by_trade: 'Completed Work Orders by Trade',
      open_vs_complete: '% Open vs Complete',
      average_age: 'Average Age Of Work Orders',
      count: '(Count)'
    },
    date_ranges: {
      today: 'Today',
      last_3_days: 'Last 3 Days',
      last_5_days: 'Last 5 Days',
      last_7_days: 'Last 7 Days',
      last_30_days: 'Last 30 Days',
      custom: 'Custom Date'
    }
  }
}
