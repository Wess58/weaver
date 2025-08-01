import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GptService {
  private API_URL = 'https://api.openai.com/v1/chat/completions';
  private API_KEY = environment.GPT_API_KEY; // move to env file!

  constructor(private http: HttpClient) { }

  getAreaSummary(location: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.API_KEY}`,
    };

    const body = {
      model: 'gpt-4.1',
      input: [
        {
          role: 'system',
          content: 'You are a helpful assistant that describes important amenities in Kenyan neighborhoods.',
        },
        {
          role: 'user',
          content: `Tell me about nearby hospitals, schools, places of worship, and recreational spots in or near ${location}.`,
        },
      ],
      temperature: 0.7,
    };

    return this.http.post<any>(this.API_URL, body, { headers });
  }
}
