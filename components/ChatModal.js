import { useState } from 'react';
import { X, Send, User } from 'lucide-react';
import styles from './ChatModal.module.css';

export default function ChatModal({ isOpen, onClose, user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! I saw your profile on Pgions.`, sender: 'me', time: 'Just now' }
  ]);

  if (!isOpen || !user) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { 
      id: Date.now(), 
      text: message, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setMessage('');
    
    // Auto-reply simulation
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Hey! Nice to connect. Are you also looking near ${user.area}?`,
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img src={user.image} alt={user.name} className={styles.avatar} />
            <div>
              <h3>{user.name}</h3>
              <span className={styles.status}>Online</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.chatWindow}>
          <div className={styles.messages}>
            {messages.map(msg => (
              <div key={msg.id} className={`${styles.messageWrapper} ${msg.sender === 'me' ? styles.me : styles.other}`}>
                {msg.sender === 'other' && <img src={user.image} alt={user.name} className={styles.msgAvatar} />}
                <div className={styles.messageBubble}>
                  <p>{msg.text}</p>
                  <span className={styles.time}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className={styles.inputArea} onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className={`input ${styles.input}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className={`btn btn-primary ${styles.sendBtn}`} disabled={!message.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
