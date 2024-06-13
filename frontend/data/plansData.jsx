import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';


export const plansData = [
  {
    id: 1,
    icon: <FaRegStar size={25} />,
    name: "BRONZE SHUTTLE",
    price: "7,000",
    features: [
      "Duration - 6 week package",
      "2 Hours per day",
      "Availabile for 2 days a week",
      "Monthly package (4 weeks)",
      "Performace tracking dashboard",
      "Tap and play RFID membership package"
    ],
  },
  {
    id: 2,
    icon: <FaStar  size={25}/>,
    name: "SILVER SHUTTLE",
    price: "12,000",
    features: [
      "Duration - 3 months package",
      "2 Hours per day",
      "Available for 3 days a week",
      "Monthly package (4 weeks)",
      "Performace tracking dashboard",
      "Tap & Play RFID membership card"
    ],
  },
  {
    id: 3,
    icon: < FaStarHalfAlt  size={25}/>,
    name: "GOLD SHUTTLE",
    price: "28,000",
    features: [
      "Duration - 6 months package",
      "2 Hours per day",
      "Available for 30 days a week",
      "Monthly package (4 weeks)",
       "Performace tracking dashboard",
      "Tap & Play RFID membership card"
    ],
  },
];
