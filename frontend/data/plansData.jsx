import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';






export const plansData = [
  {
    id: 1,
    icon: <StarOutlined style={{ fontSize: "24px"}}/>,
    name: "BRONZE SHUTTLE",
    price: "7,000",
    features: [
      "Duration - 6 week package",
      "2 Hours per day",
      "Availabile for 2 days a week",
      "Performace tracking dashboard"
    ],
  },
  {
    id: 2,
    icon: <StarFilled style={{ fontSize: "24px"}}/>,
    name: "SILVER SHUTTLE",
    price: "12,000",
    features: [
      "Duration - 3 months package",
      "2 Hours per day",
      "Available for 3 days a week",
      "Performace tracking dashboard"
    ],
  },
  {
    id: 3,
    icon: <StarTwoTone twoToneColor="gold"  style={{ fontSize: "24px" }}/>,
    name: "GOLD SHUTTLE",
    price: "28,000",
    features: [
      "Duration - 6 months package",
      "2 Hours per day",
      "Available for 30 days for a month",
       "Performace tracking dashboard"
    ],
  },
];
