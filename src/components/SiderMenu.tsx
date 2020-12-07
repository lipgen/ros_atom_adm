import React from "react";
import "../styles/SiderMenu.less";

// const items = [
//     'ТОПОГРАФИЧЕСКАЯ КАРТА',
//     'КАРТА С КОСМОСА',
//     'ГИДРОГЕОЛОГИЧЕСКАЯ КАРТА ЛИСТА 0-35-VI',
//     'РАЗРЕЗ К ГИДРОГЕОЛОГИЧЕСКОЙ КАРТЕ ЛИСТА  0-35-VI',
//     'КАРТА ЧЕТВЕРТИЧНЫХ ОТЛОЖЕНИЙ ЛИСТА 0-35-VI',
//     'РАЗРЕЗ К КАРТЕ ЧЕТВЕРТИЧНЫХ ОТЛОЖЕНИЙ ЛИСТА 0-35-VI',
//     'ГЕОМОРФОЛОГИЧЕСКАЯ КАРТА ЛИСТА 0-35-VI',
// ]

export enum Item {
  topography = "ТОПОГРАФИЧЕСКАЯ КАРТА",
  hydro = "ГИДРОГЕОЛОГИЧЕСКАЯ КАРТА ЛИСТА 0-35-VI",
  relief = "ГЕОМОРФОЛОГИЧЕСКАЯ КАРТА ЛИСТА 0-35-VI",
  inds_pd = "УРОВЕНЬ ГЛУБИНЫ ГРУНТОВЫХ ВОД",
  cadastr = "СКВАЖИНЫ КАДАСТРА ПОДЗЕМНЫХ ВОД",
}

export const getKeyByValueFromItem = (sourceItem: Item) => (Object.entries(Item).find((item) => item[1] === sourceItem)?.[0]);

const items = [Item.topography, Item.hydro, Item.relief, Item.inds_pd, Item.cadastr];

type Props = {
  selectedItem: Item;
  onItemClick: (item: Item) => void;
};

function SiderMenu(props: Props) {
  return (
    <div className="sider-menu">
      <ul className="list">
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => props.onItemClick(item)}
            className={
              item === props.selectedItem ? "sider-menu__selected" : ""
            }
          >
            <span className="sider-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SiderMenu;
