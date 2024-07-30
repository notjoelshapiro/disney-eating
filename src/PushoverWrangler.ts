import axios, { AxiosError, AxiosResponse } from "axios";
import { OpeningMealTimesDefinition, lookupDataDefinition } from "./queryHelpers";

type PushoverMessage = {
  token: string;
  user: string;
  message: string;
  title: string;
  html: number;
  url?: string;
  url_title?: string;
  priority?: number;
  retry?: number;
  expire?: number;
  sound?: string;
  attachment_base64?: string;
  attachment_type?: string;
}

export class PushoverWrangler {
  pushoverToken: string;
  pushoverUser: string;

  constructor(pushoverToken: string, pushoverUser: string) {
      this.pushoverToken = pushoverToken;
      this.pushoverUser = pushoverUser;
  }

  async notifyMealAvailable(
    messageText: string,
    eateryName: string,
    mealTime: OpeningMealTimesDefinition,
    eateryURL:string,
    imageBase64: string|null = null,
    imageMimeType: string|null = null
  ): Promise<void> {
    // TODO test html formatting.
    const messageTitle = `${eateryName} @ ${mealTime}!`;

    // TODO test image
    const message: PushoverMessage = {
      token: this.pushoverToken,  // Replace with your Pushover application token
      user: this.pushoverUser,    // Replace with your user key
      message: messageText,
      title: messageTitle,
      url: eateryURL,
      url_title: 'GIT IT',
      html: 1,                  // Enable HTML formatting
      sound: 'none'             // No sound
    };

    if (imageBase64 !== null && imageBase64 !== '' && imageMimeType !== null && imageMimeType !== '') {
      message.attachment_base64 = imageBase64;
      message.attachment_type = imageMimeType;
    }

    await this.sendNotification(message);
  }

  async notifyError(
    eventName: string,
    eateryData: lookupDataDefinition
  ): Promise<void> {
    // TODO test html formatting.
    const messageTitle = `ERROR: ${eventName}. ${eateryData.eatery} @ ${eateryData.dateString} for ${eateryData.guestCount}!`;

    // TODO test image
    const message: PushoverMessage = {
      token: this.pushoverToken,  // Replace with your Pushover application token
      user: this.pushoverUser,    // Replace with your user key
      message: 'ERROR!',
      title: messageTitle,
      html: 1,                  // Enable HTML formatting
      sound: 'none'             // No sound
    };

    await this.sendNotification(message);
  }

  async sendNotification(pushoverData: PushoverMessage): Promise<void> {
      console.log('pushoverData:', pushoverData);

      const url = 'https://api.pushover.net/1/messages.json';

      try {
        const response: AxiosResponse = await axios.post(url, pushoverData);
        console.log('Notification sent successfully:', response.data);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Failed to send notification:', axiosError.response.data);
      } else {
        console.error('Error sending notification:', axiosError.message);
      }
    }
  }
}