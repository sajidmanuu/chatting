
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Moment from 'react-moment';
import { io } from "socket.io-client";

const Chatroom = () => {
    const location = useLocation();
    const msgBoxRef = useRef();
    const [data, setData] = useState({});
    const [msg, setMsg] = useState("");
    const [socket, setSocket] = useState();
    const [allMessage, setMessage] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:8000/");
        setSocket(socket);
        socket.on("connect", () => {
            console.log(socket.id);
            socket.emit("joinRoom", location.state.room);
        });
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("getLatestMessage", newMessage => {
                setMessage([...allMessage, newMessage]);
                msgBoxRef.current.scrollIntoView({ behavior: "smooth" });
                setMsg("");
            });
        }
    }, [socket, allMessage]);

    useEffect(() => {
        setData(location.state);
    }, [location]);

    const handleChange = e => setMsg(e.target.value);
    const handleEnter = e => e.keyCode === 13 ? onSubmit() : "";
    const onSubmit = () => {
        if (msg) {
            const newMessage = { time: new Date(), msg, name: data.name };
            socket.emit("newMessage", { newMessage, room: data.room });
        }
    }

    return (
        <div className="container mt-5">
            <div className="card bg-light shadow">
                <div className="card-header bg-primary text-white mb-0">
                    <h2 className="mb-0">Welcome {data.name}</h2>
                </div>
                <div className="card-body message-frame" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {allMessage.map(msg => {
                        const isCurrentUser = data.name === msg.name;
                        const messageClasses = isCurrentUser ? ' text-green text-end' : ' text-blue text-start';

                        return (
                            <div className={`message ${messageClasses}`} key={msg.time}>
                                <div className="message-details">
                                    <strong>{msg.name+" "}</strong>
                                    <small className="text-muted"><Moment fromNow>{msg.time}</Moment></small>
                                </div>
                                <p className="message-text">{msg.msg}</p>
                            </div>
                        );
                    })}
                    <div ref={msgBoxRef}></div>
                </div>
                <div className="card-footer bg-light">
                    <div className="mt-1 mb-0 form-group d-flex">
                        <input type="text" onKeyDown={handleEnter} className="form-control mr-2" placeholder="Enter text" value={msg} onChange={handleChange} />
                        <button onClick={onSubmit} className="btn btn-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;

