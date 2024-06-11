import React from 'react'
//import * as ReactDOM from "react-dom";
//import styled from 'styled-components'
import { MainAreaLayout } from '../components/MainAreaLayout'
import { KuiButton  } from '@paychex/kuiper-components-core/react';
import '@progress/kendo-theme-default/dist/all.css';


import {
  TreeList,
  filterBy,
  orderBy,
  TreeListDraggableRow,
  mapTree,
  moveTreeItem,
  extendDataItem,
  TreeListRowDragEvent,
  TreeListExpandChangeEvent,
  TreeListColumnProps,
  TreeListTextFilter,
  TreeListFilterChangeEvent,
  TreeListSortChangeEvent,
} from "@progress/kendo-react-treelist";

import employees from "../data/data";
import { Employee,DataState } from "../data/models/interfaces";
import { FilterDescriptor } from "@progress/kendo-data-query";
import { SortDescriptor } from "@progress/kendo-data-query";

const subItemsField: string = "employees";
const expandField: string = "expanded";
const columns: TreeListColumnProps[] = [
  { field: "name", title: "Name", width: "34%", expandable: true, filter: TreeListTextFilter, },
  { field: "position", title: "Position", width: "33%" },
];

interface AppState {
  data: Employee[];
  filter: FilterDescriptor[];
  sort: SortDescriptor[];
  expanded: number[];
  allowUnsort: boolean;
  multiple: boolean;
}

const App = () => {
  const [state, setState] = React.useState<AppState>({
    data: [...employees],
    filter: [],
    sort: [
     {
       field: "name",
       dir: "asc",
     },
    ],
    allowUnsort: true,
    multiple: true,
    expanded: [1,2, 32],
  });

  const onRowDrop = (event: TreeListRowDragEvent) => {
    setState({
      ...state,
      data: moveTreeItem(
        processData(),
        event.dragged,
        event.draggedOver,
        subItemsField
      ),
    });
  };

  const onExpandChange = (event: TreeListExpandChangeEvent) => {
    setState({
      ...state,
      expanded: event.value
        ? state.expanded.filter((id) => id !== event.dataItem.id)
        : [...state.expanded, event.dataItem.id],
    });
  };

  const handleFilterChange = (event: TreeListFilterChangeEvent) => {
    setState({
      ...state,
      filter: event.filter,
    });
  };

  const handleSortChange = (event: TreeListSortChangeEvent) => {
    setState({
      ...state,
      sort: event.sort,
    });
  };

  const addExpandField = (dataArr: Employee[]) => {
    const expanded = state.expanded;
    return mapTree(dataArr, subItemsField, (item: Employee) =>
      extendDataItem(item, subItemsField, {
        expanded: expanded.includes(item.id),
      })
    );
  };

  const processData = () => {
    let {data} = state;
    let filteredData = filterBy(data, state.filter, subItemsField);
    let sortedData = orderBy(filteredData, state.sort, subItemsField);
    return addExpandField(sortedData);
  };

  return (
    <div>
      <TreeList
        style={{ maxHeight: "510px", overflow: "auto" }}
        expandField={expandField}
        subItemsField={subItemsField}
        onExpandChange={onExpandChange}
        filter={state.filter}
        data={processData()}
        onFilterChange={handleFilterChange}
        columns={columns}
        onRowDrop={onRowDrop}
        row={TreeListDraggableRow}
        sort={state.sort}
        onSortChange={handleSortChange}
      />
    </div>
  );
};


/*
import {
  TreeView,
  TreeViewDragClue,
  processTreeViewItems,
  moveTreeViewItem,
  TreeViewDragAnalyzer,
  TreeViewItemDragOverEvent,
  TreeViewItemDragEndEvent,
  TreeViewItemClickEvent,
  TreeViewCheckChangeEvent,
} from "@progress/kendo-react-treeview";

interface TreeViewDataItem {
  text: string;
  expanded?: boolean;
  checked?: boolean;
  selected?: boolean;
  items?: TreeViewDataItem[];
}

function getSiblings(itemIndex: string, data: TreeViewDataItem[]) {
  let result = data;

  const indices = itemIndex.split(SEPARATOR).map((index) => Number(index));
  for (let i = 0; i < indices.length - 1; i++) {
    result = result[indices[i]].items || [];
  }

  return result;
}

const SEPARATOR = "_";
const treeData: TreeViewDataItem[] = [
  {
    text: "Furniture",
    expanded: true,
    items: [
      { text: "Tables & Chairs" },
      { text: "Sofas" },
      { text: "Occasional Furniture" },
    ],
  },
  {
    text: "Decor",
    expanded: true,
    items: [
      { text: "Bed Linen" },
      { text: "Curtains & Blinds" },
      { text: "Carpets" },
    ],
  },
];

const TreeviewApp = () => {

  const dragClue = React.useRef<any>();
  const dragOverCnt = React.useRef<number>(0);
  const isDragDrop = React.useRef<boolean>(false);
  const [tree, setTree] = React.useState(treeData);
  const [expand, setExpand] = React.useState({ ids: [], idField: "text" });
  const [selected, setSelected] = React.useState({ ids: [], idField: "text" });

  const getClueClassName = (event: any) => {
    const eventAnalyzer = new TreeViewDragAnalyzer(event).init();
    const { itemHierarchicalIndex: itemIndex } = eventAnalyzer.destinationMeta;

    if (eventAnalyzer.isDropAllowed) {
      switch (eventAnalyzer.getDropOperation()) {
        case "child":
          return "k-i-plus";
        case "before":
          return itemIndex === "0" || itemIndex.endsWith(`${SEPARATOR}0`)
            ? "k-i-insert-up"
            : "k-i-insert-middle";
        case "after":
          const siblings = getSiblings(itemIndex, tree);
          const lastIndex = Number(itemIndex.split(SEPARATOR).pop());

          return lastIndex < siblings.length - 1
            ? "k-i-insert-middle"
            : "k-i-insert-down";
        default:
          break;
      }
    }

    return "k-i-cancel";
  };
  const onItemDragOver = (event: TreeViewItemDragOverEvent) => {
    dragOverCnt.current++;
    dragClue.current.show(
      event.pageY + 10,
      event.pageX,
      event.item.text,
      getClueClassName(event)
    );
  };

  const onItemDragEnd = (event: TreeViewItemDragEndEvent) => {
    isDragDrop.current = dragOverCnt.current > 0;
    dragOverCnt.current = 0;
    dragClue.current.hide();

    const eventAnalyzer = new TreeViewDragAnalyzer(event).init();

    if (eventAnalyzer.isDropAllowed) {
      const updatedTree: any = moveTreeViewItem(
        event.itemHierarchicalIndex,
        tree,
        eventAnalyzer.getDropOperation() || "child",
        eventAnalyzer.destinationMeta.itemHierarchicalIndex
      );
      setTree(updatedTree);
    }
  };
  const onItemClick = (event: TreeViewItemClickEvent) => {
    if (!isDragDrop.current) {
      let ids: any = selected.ids.slice();
      const index = ids.indexOf(event.item.text);

      index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
      setSelected({ ids, idField: "text" });
    }
  };
  const onExpandChange = (event: TreeViewCheckChangeEvent) => {
    let ids: any = expand.ids.slice();
    const index = ids.indexOf(event.item.text);

    index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
    setExpand({ ids, idField: "text" });
  };
  
  return (
    <div>
      <TreeView
        draggable={true}
        onItemDragOver={onItemDragOver}
        onItemDragEnd={onItemDragEnd}
        data={processTreeViewItems(tree, { expand: expand, select: selected })}
        expandIcons={true}
        onExpandChange={onExpandChange}
        onItemClick={onItemClick}
      />
      <TreeViewDragClue ref={dragClue} />
    </div>
  );
};  
*/

function CMContent(): JSX.Element {
    return (
      <div className='kui-parent-container'>
        <section>
          <div className="kui-button-group" slot="actions">
            <KuiButton mode="primary" >Sample Button</KuiButton>
          </div>   
          <div>
            <App/>
          </div>     
        </section>
      </div>
    );
  }

const CustomerMapping: React.FunctionComponent = () => {
    return (  
      <MainAreaLayout title="Customer Mapping">
        <CMContent />
      </MainAreaLayout>
    );
}
export default CustomerMapping;