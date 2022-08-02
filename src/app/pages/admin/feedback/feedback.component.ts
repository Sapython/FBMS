import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  categories: string[] = [
    'Pending Feedback',
    'Ongoing',
    'Resolved',
    'Unresolved',
  ];

  feedbacks: any = {
    'Pending Feedback': [
      {
        title: 'Pending Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
    ],
    Ongoing: [
      {
        title: 'Ongoing Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
    ],
    Resolved: [
      {
        title: 'Resolved Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
    ],
    Unresolved: [
      {
        title: 'Unresolved Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
      {
        title: 'Service',
        customerName: 'Brook',
        details: 'Excellent food lorem ipsum dispum',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
