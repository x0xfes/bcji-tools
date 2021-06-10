<template lang="pug">
  div
    h1.title BCJI Chat Tool
    .buttons
      b-button(@click="addMessageLast") 末尾に追加
      b-button(@click="build") 生成
    div
      b-field(v-for="(message, i) in messages" :key="message.id")
        .control
          b-button(icon-left="plus" @click="addMessage(i)")
        b-input(placeholder="名前" icon="account" v-model="message.name")
        b-input(placeholder="コメント" icon="message-text" expanded v-model="message.message")
        .control
          b-button(@click="toggleMessageSide(message)") {{ message.isRight ? '左' : '右' }}
        .control
          b-button(icon-left="minus" @click="deleteMessage(i)")
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';

  const BG_COLOR = '#e6e6e6';
  const NAME_COLOR = '#808080';
  const COMMENT_BOX_COLOR = '#ffffff';
  const createSpace = (num: number) => `《opacity:0》${'.'.repeat(num)}《/opacity》`;
  const createName = (name: string) => `《color:${NAME_COLOR}》《xsmall》${name}《/xsmall》《/color》`;
  const createComment = (message: string) => `《bgcolor:${COMMENT_BOX_COLOR}》${createSpace(1)}${message}${createSpace(1)}《/bgcolor》`;

  interface Message {
    id: number,
    name: string,
    message: string,
    isRight: boolean
  }

  @Component
  export default class ChatPage extends Vue {
    $buefy: any;
    lastId = 0;
    messages: Message[] = [];
    created() {
      this.addMessageLast();
    }
    createMessage(): Message {
      return {
        id: ++this.lastId,
        name: '',
        message: '',
        isRight: false
      };
    }
    addMessage(i: number) {
      this.messages.splice(i, 0, this.createMessage());
    }
    addMessageLast() {
      this.messages.push(this.createMessage());
    }
    toggleMessageSide(message: Message) {
      message.isRight = !message.isRight;
    }
    deleteMessage(i: number) {
      this.messages.splice(i, 1);
    }
    build() {
      let text = `《boxbgcolor:${BG_COLOR}》\n`;
      for (const message of this.messages) {
        if (message.isRight) {
          text += `《right》《sub》${createName(message.name)}${createSpace(2)}《/sub》《/right》`;
        } else {
          text += `《sub》${createSpace(2)}${createName(message.name)}《/sub》`;
        }
        text += '\n';
        if (message.isRight) {
          text += `《right》${createComment(message.message)}${createSpace(1)}《/right》`;
        } else {
          text += `${createSpace(1)}${createComment(message.message)}`;
        }
        text += '\n';
      }
      text += '《/boxbgcolor》';

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        this.$buefy.snackbar.open('クリップボードにコピーしました。');
      } else {
        this.$buefy.snackbar.open('お使いのブラウザは非対応です。');
      }
    }
  }
</script>
