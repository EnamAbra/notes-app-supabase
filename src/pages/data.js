// data.js

/**
 * Example dummy data for the notes application.
 * @type {Array<Object>}
 */
export const dummyNotes = [
  {
    id: '1',
    title: 'Project Alpha Kickoff',
    content: 'Review the initial scope document and set up the development environment. Focus on API contract first.',
    isPinned: true,
    lastEdited: '2025-11-27T10:30:00Z',
    color: 'bg-yellow-100', // Subtle color for visual distinction
  },
  {
    id: '2',
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread, Spinach, Chicken breast, and remember the artisanal cheese for the weekend.',
    isPinned: true,
    lastEdited: '2025-11-28T09:15:00Z',
    color: 'bg-blue-100',
  },
  {
    id: '3',
    title: 'Meeting Follow-up: Q3 Budget',
    content: 'Send out the summary of the Q3 budget discussion. Need to check with finance about the software license renewal cost for next year.',
    isPinned: false,
    lastEdited: '2025-11-27T14:45:00Z',
    color: 'bg-white',
  },
  {
    id: '4',
    title: 'Learning React Hooks',
    content: 'Spent an hour on `useState` and `useEffect`. Next up is `useContext` and implementing a custom hook for data fetching.',
    isPinned: false,
    lastEdited: '2025-11-26T19:00:00Z',
    color: 'bg-white',
  },
  {
    id: '5',
    title: 'Ideas for Blog Post',
    content: '1. Why Tailwind CSS is great. 2. State management in modern React. 3. My journey from PHP to Node.js.',
    isPinned: false,
    lastEdited: '2025-11-28T15:30:00Z',
    color: 'bg-white',
  },
];