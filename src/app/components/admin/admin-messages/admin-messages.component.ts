import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/types';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inbox-container">
      <div class="inbox-header">
        <div>
          <h1>Inbox & Clients</h1>
          <p>Consultez les messages reçus via le formulaire de contact.</p>
        </div>
        <div class="badge-count">
          {{ messages().length }} message(s)
        </div>
      </div>

      <div class="inbox-layout">
        <!-- Messages List -->
        <div class="messages-list card">
          @if (messages().length === 0) {
            <div class="empty-inbox">
              <i class="fa-regular fa-envelope-open"></i>
              <p>Aucun message reçu pour le moment.</p>
            </div>
          } @else {
            <div class="list-wrapper">
              @for (msg of messages(); track msg.id) {
                <div class="msg-item" 
                     [class.active]="selectedMessage()?.id === msg.id"
                     (click)="selectMessage(msg)">
                  <div class="msg-meta">
                    <span class="msg-sender">{{ msg.nom }}</span>
                    <span class="msg-date">{{ msg.date }}</span>
                  </div>
                  <div class="msg-subject">{{ msg.sujet }}</div>
                  <div class="msg-excerpt">{{ msg.message | slice:0:60 }}...</div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Message Detail Panel -->
        <div class="message-view card">
          @if (selectedMessage()) {
            <div class="view-header">
              <div>
                <h2>{{ selectedMessage()?.sujet }}</h2>
                <div class="sender-info">
                  <strong>De:</strong> {{ selectedMessage()?.nom }} 
                  <span class="sender-email">&lt;{{ selectedMessage()?.email }}&gt;</span>
                </div>
                <div class="msg-timestamp"><i class="fa-regular fa-clock"></i> {{ selectedMessage()?.date }}</div>
              </div>
              <div>
                <button class="btn btn-danger-outline" (click)="confirmDelete(selectedMessage()!.id)">
                  <i class="fa-regular fa-trash-can"></i> Supprimer
                </button>
              </div>
            </div>
            <div class="view-body">
              <p>{{ selectedMessage()?.message }}</p>
              @if (selectedMessage()?.reponse) {
                <div class="response-block" style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-tertiary); border-left: 4px solid var(--accent-primary); border-radius: 0.5rem;">
                  <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--text-primary);"><i class="fa-solid fa-reply"></i> Ma Réponse</h4>
                  <p style="margin: 0; font-style: italic;">{{ selectedMessage()?.reponse }}</p>
                </div>
              }
            </div>
          } @else {
            <div class="empty-view">
              <i class="fa-solid fa-arrow-left"></i>
              <p>Sélectionnez un message dans la liste pour afficher son contenu.</p>
            </div>
          }
        </div>
      </div>

      <!-- Confirmation Modal (RM5) -->
      @if (showDeleteModal()) {
        <div class="modal-overlay">
          <div class="modal-card card">
            <h3><i class="fa-solid fa-triangle-exclamation modal-warning-icon"></i> Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer définitivement ce message ? Cette action est irréversible.</p>
            <div class="modal-actions">
              <button class="btn btn-outline" (click)="cancelDelete()">Annuler</button>
              <button class="btn btn-danger" (click)="deleteConfirmed()">Supprimer</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .inbox-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: calc(100vh - 8rem);
    }
    .inbox-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .inbox-header h1 {
      margin-bottom: 0.25rem;
    }
    .inbox-header p {
      margin-bottom: 0;
    }
    .badge-count {
      background: var(--accent-primary);
      color: white;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .inbox-layout {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 1.5rem;
      flex-grow: 1;
      height: 100%;
      min-height: 0; /* allows overflow scroll on children */
    }
    .messages-list {
      padding: 0;
      overflow-y: auto;
      height: 100%;
    }
    .list-wrapper {
      display: flex;
      flex-direction: column;
    }
    .msg-item {
      padding: 1.25rem;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .msg-item:hover {
      background-color: var(--bg-tertiary);
    }
    .msg-item.active {
      background-color: var(--bg-tertiary);
      border-left: 4px solid var(--accent-primary);
    }
    .msg-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }
    .msg-sender {
      font-weight: 600;
      color: var(--text-primary);
    }
    .msg-date {
      color: var(--text-tertiary);
    }
    .msg-subject {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .msg-excerpt {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.3;
    }
    .empty-inbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--text-tertiary);
      padding: 2rem;
    }
    .empty-inbox i {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }
    .message-view {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      padding: 2rem;
    }
    .view-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .view-header h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .sender-info {
      font-size: 0.95rem;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }
    .sender-email {
      color: var(--text-tertiary);
      font-family: monospace;
    }
    .msg-timestamp {
      font-size: 0.8rem;
      color: var(--text-tertiary);
    }
    .view-body {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary);
      white-space: pre-wrap;
    }
    .empty-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--text-tertiary);
    }
    .empty-view i {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .btn-danger-outline {
      border: 1px solid #f87171;
      background: transparent;
      color: #ef4444;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    .btn-danger-outline:hover {
      background-color: #fef2f2;
      color: #b91c1c;
    }

    /* Modals CSS (RM5) */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .modal-card {
      max-width: 450px;
      width: 90%;
      text-align: center;
      padding: 2rem;
      animation: scaleUp 0.2s ease-out;
    }
    .modal-warning-icon {
      color: #f59e0b;
      margin-right: 0.5rem;
    }
    .modal-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn-danger {
      background: #ef4444;
      color: white;
    }
    .btn-danger:hover {
      background: #dc2626;
    }

    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
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
