import { isString } from "lodash";
import { useEffect, useRef } from "react";


type TitleOptions = {
  /**
   * Set title to this new value, ignoring previous document title
   */
  title?: string | (() => string);
  /**
   * Update title based on the previous title
   */
  updateTitle?: (previous: string) => string;
};

export function useDocumentTitle({title, updateTitle}: TitleOptions) {
  const previousTitle = useRef(document.title);
  useEffect(() => {
    // set title
    const t = title == null || isString(title) ? title : title();
    if (t) {
      document.title = t;
    } else if (updateTitle) {
      document.title = updateTitle(document.title);
    }

    // restore on unmount
    const previous = previousTitle.current;
    return () => {
      document.title = previous;
    };
  }, [title, updateTitle]);
}
