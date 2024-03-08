import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./chat.scss";
import { makeRequest } from "../../../axios";

const Chat = ({ selectedId }) => {
  const queryClient = useQueryClient();

  //R E L A T I O N S H I P ===> G E T
  const { isPending: isRPending, data: messageData } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      makeRequest.get("/messages?SelectedId=" + selectedId).then((res) => {
        return res.data;
      }),
  });

  ////

  // const mutation = useMutation({
  //   mutationFn: (following) => {
  //     if (following)
  //       return makeRequest.delete("/relationships?userId=" + userId);
  //     return makeRequest.post("/relationships", { userId });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["relationship"] });
  //   },
  // });

  return (
    <div className="chat">
      <div className="card"></div>
      <button>Send</button>
    </div>
  );
};

export default Chat;
