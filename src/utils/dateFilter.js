/**
 * Utility Vue Filter function for to convert ISO date format to more readable format
 */
export default value => {
  const date = new Date(value);
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
