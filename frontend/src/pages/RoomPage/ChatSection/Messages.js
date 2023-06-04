import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

const Message = ({author, content, sameAuthor, messageCreatedByMe, createdTime}) => {
    const alignClass = messageCreatedByMe ? 'message_align_right' : 'message_align_left';
    const authorText = messageCreatedByMe ? '我' : author;
    const contentStyles = messageCreatedByMe ? 'message_right_styles' : 'message_left_styles';
    return (
        <div className={`message_container ${alignClass}`}>
            {!sameAuthor &&
                <>
                    <span className="created_time_text">{createdTime}</span>
                    <p className='message_title'>{authorText}</p>
                </>
            }
            <span className={`message_content ${contentStyles}`}>{content}</span>
        </div>
    );
};

const Messages = ({messages}) => {
    const scrollRef = useRef();
    useEffect(() => {
        if (scrollRef) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);
    return (
        <div className='messages_container'>
            {messages.map((message, index) => {
                const sameAuthor = index > 0 && message.identity === messages[index - 1].identity;
                return (
                    <Message
                        key={`${message.content}${index}`}
                        author={message.identity}
                        content={message.content}
                        sameAuthor={sameAuthor}
                        messageCreatedByMe={message.messageCreatedByMe}
                        createdTime={message.createdTime}
                    />
                );
            })}
            <div ref={scrollRef}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStateToProps)(Messages);
