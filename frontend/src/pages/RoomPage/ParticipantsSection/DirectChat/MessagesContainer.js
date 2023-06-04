import React, {useEffect, useRef} from 'react';

const SingleMessage = ({isAuthor, messageContent, createdTime}) => {
    const messageStyling = isAuthor
        ? 'author_direct_message'
        : 'receiver_direct_message';

    const containerStyling = isAuthor
        ? 'direct_message_container_author'
        : 'direct_message_container_receiver';

    return (
        <>
            <span className="created_time_text">{createdTime}</span>
            <div className={containerStyling}>
                <p className={messageStyling}>{messageContent}</p>
            </div>
        </>
    );
};
const MessagesContainer = ({messages}) => {
    const scrollRef = useRef();
    useEffect(() => {
        if (scrollRef) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);
    return (
        <div className='direct_messages_container'>
            {messages.map((message) => {
                return (
                    <SingleMessage
                        messageContent={message.messageContent}
                        identity={message.identity}
                        isAuthor={message.isAuthor}
                        key={`${message.messageContent}-${message.identity}-${Math.random()}`}
                        createdTime={message.createdTime}
                    />
                );
            })}
            <div ref={scrollRef}/>
        </div>
    );
};

export default MessagesContainer;
