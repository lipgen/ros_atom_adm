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
  hydro = "ПОВЕРХНОСТЬ УРОВНЯ ПОДЗЕМНЫХ ВОД",
  relief = "ПОВЕРХНОСТЬ РЕЛЬЕФА",
  inds_pd = "УРОВЕНЬ ГЛУБИНЫ ГРУНТОВЫХ ВОД",
  // cadastr = "СКВАЖИНЫ КАДАСТРА ПОДЗЕМНЫХ ВОД",
}

export const getKeyByValueFromItem = (sourceItem: Item) => (Object.entries(Item).find((item) => item[1] === sourceItem)?.[0]);

const items = [
  Item.topography,
  Item.hydro,
  Item.relief,
  Item.inds_pd,
  // Item.cadastr,
];

type Props = {
  selectedItem: Item;
  onItemClick: (item: Item) => void;
};

const renderItem = (
  i: number,
  onItemClick: (item: Item) => void,
  item: Item,
  selectedItem: Item,
) => <li
  key={i}
  onClick={() => onItemClick(item)}
  className={
    item === selectedItem ? "sider-menu__selected" : ""
  }
>
  <span className="sider-text">{item}</span>
</li>

const renderItems = (items: Item[], selectedItem: Item, onItemClick: (item: Item) => void) => {
  if (selectedItem === Item.topography) {
    return renderItem(0, onItemClick, items[0], selectedItem);
  }

  return items.map((item: Item, i: number) => renderItem(i, onItemClick, item, selectedItem));
}

const SiderMenu = (props: Props) => {
  const {
    selectedItem,
    onItemClick,
  } = props;
  return (
    <div className="sider-menu">
      <ul className="list">
        { renderItems(items, selectedItem, onItemClick) }
      </ul>
    </div>
  );
}

export default SiderMenu;
