export const useLogger = () => {
  return (event, data) => {
    const log = `[${new Date().toISOString()}] ${event}: ${JSON.stringify(data)}`;
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(log);
    localStorage.setItem('logs', JSON.stringify(logs));
  };
};
