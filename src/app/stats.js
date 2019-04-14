import { loadStats, storeStats } from "./state";

export const saveStats = data => {

  const file = loadStats();
  file.stats = [
    {
      id: `#${file.stats.length + 1}`,
      time: generateDate(),
      ...data
    },
    ...file.stats
  ];
  storeStats(file);
}

export const openStats = name => {
  return loadStats().stats.filter(
    item => item.id === name
  )[0];
}

const generateDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const sec = date.getSeconds();
  return `${year}-${month+1}-${day} ${hour}h${minute}min${sec}s`;
}