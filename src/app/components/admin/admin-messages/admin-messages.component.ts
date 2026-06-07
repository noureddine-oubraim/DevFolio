import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/types';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './admin-messages.component.html',
  styleUrl: './admin-messages.component.css'
})
export class AdminMessagesComponent {
  private messageService = inject(MessageService);
  messages = this.messageService.allMessages;

  selectedMessage = signal<Message | null>(null);
  
  // Modal state
  showDeleteModal = signal(false);
  messageToDeleteId = signal<number | null>(null);

  selectMessage(msg: Message) {
    this.selectedMessage.set(msg);
  }

  confirmDelete(id: number) {
    this.messageToDeleteId.set(id);
    this.showDeleteModal.set(true);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.messageToDeleteId.set(null);
  }

  deleteConfirmed() {
    const id = this.messageToDeleteId();
    if (id !== null) {
      this.messageService.deleteMessage(id);
      if (this.selectedMessage()?.id === id) {
        this.selectedMessage.set(null);
      }
      this.cancelDelete();
    }
  }
}
