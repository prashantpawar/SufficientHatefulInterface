import { generateUUID } from './utils';
export const store =
{
    tasks: [
        {
            id: generateUUID(),
            name: 'Task 1',
            completed: true
        },
        {
            id: generateUUID(),
            name: 'Task 2',
            completed: false
        }
    ]
};