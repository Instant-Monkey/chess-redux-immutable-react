import { Players } from './constants';

export function sortListByPosition(list) {
  return list.sort((a, b) => {
    if (a.get(0) > b.get(0)) {
      return 1;
    } else if (a.get(0) === b.get(0)) {
      if (a.get(1) > b.get(1)) {
        return 1;
      }
    }
    return -1;
  });
}

export function getOppositeTeam(team) {
  if (team === Players.WHITE) {
    return Players.BLACK;
  }

  return Players.WHITE;
}
