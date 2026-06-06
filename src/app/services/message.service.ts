import { Injectable, signal, computed } from '@angular/core';
import { Message } from '../models/types';
import { initialMessages } from '../data/mock-db';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly STORAGE_KEY = 'devfolio_messages_v2';
  
  // State signal holding all messages
  private messages = signal<Message[]>(this.loadMessages());

  // Computed signal for outside reading
  public allMessages = computed(() => this.messages());

  constructor() {}

  private loadMessages(): Message[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return initialMessages;
      }
    }
    // Seed with sample messages on first load
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialMessages));
    return initialMessages;
  }

  private saveMessages(messages: Message[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
    this.messages.set(messages);
  }

  addMessage(msg: Omit<Message, 'id' | 'date'>): void {
    const current = this.messages();
    const newId = current.length > 0 ? Math.max(...current.map(m => m.id)) + 1 : 1;
    const newMessage: Message = {
      ...msg,
      id: newId,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    this.saveMessages([...current, newMessage]);
  }

  deleteMessage(id: number): void {
    const newMessages = this.messages().filter(m => m.id !== id);
    this.saveMessages(newMessages);
  }
}
