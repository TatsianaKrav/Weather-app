export function getDayOfWeek(value: number): string {
  let days = ['Su', 'Mon', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return days[value];
}
