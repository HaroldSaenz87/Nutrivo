
export type UserData = {
  name: string;
};

export const mockUserData: UserData = {
  name: 'Steven Torres',
};

// Turns "Steven Torres" into "ST" for the avatar bubble
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join('');
}