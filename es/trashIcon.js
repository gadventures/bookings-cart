var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";

var TrashIcon = function TrashIcon(props) {
  return React.createElement(
    "svg",
    _extends({ viewBox: "0 0 18 19", width: "1em", height: "1em" }, props),
    React.createElement("path", {
      d: "M12.59 14.56a.386.386 0 0 1-.395.393h-.782a.386.386 0 0 1-.394-.393V7.476c0-.222.17-.395.394-.395h.782c.226 0 .395.173.395.396v7.082zm-3.146 0a.39.39 0 0 1-.395.393h-.786a.39.39 0 0 1-.395-.393V7.476a.39.39 0 0 1 .395-.395h.786a.39.39 0 0 1 .395.396v7.082zm1.969-11.412l-.594-1.439a.43.43 0 0 0-.206-.134h-3.9a.376.376 0 0 0-.206.135l-.604 1.438h5.51zM6.297 14.56a.388.388 0 0 1-.394.393h-.787a.388.388 0 0 1-.394-.393V7.476a.39.39 0 0 1 .394-.395h.787a.39.39 0 0 1 .394.396v7.082zm7.868-9.839H3.147v11.657c0 .59.332.936.395.936H13.77c.062 0 .394-.346.394-.936V4.72zm3.147-.391c0 .22-.17.391-.395.391H15.74v11.657c0 1.352-.885 2.509-1.97 2.509H3.543c-1.081 0-1.967-1.107-1.967-2.459V4.721H.395A.389.389 0 0 1 0 4.33v-.79c0-.22.173-.392.395-.392h3.799l.86-2.054C5.3.493 6.039 0 6.692 0h3.932c.653 0 1.39.493 1.634 1.095l.863 2.054h3.796c.225 0 .395.171.395.393v.789z",
      fill: props.fill || "#000",
      fillRule: "evenodd"
    })
  );
};

export default TrashIcon;