import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

export default function addNotification(
  title: string,
  message: string,
  type: string
) {
  Store.addNotification({
    title,
    message,
    type: type as NOTIFICATION_TYPE,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
}
