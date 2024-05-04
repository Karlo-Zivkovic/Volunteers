import { Rate, message } from "antd";
import { useState } from "react";
import { Volunteer } from "../../types";
import axios from "axios";
import { calculateAverageRating } from "../../utils";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

interface RatingProps {
  item: Volunteer;
  fetchVolunteers: () => Promise<void>;
}

export default function Rating({ item, fetchVolunteers }: RatingProps) {
  const avg = calculateAverageRating(item);
  const total = item.ratings.length;

  // Somehow had to persist the ratings, used localStorage as there is no backend/auth for having a user
  const [rating, setRating] = useState<number>(() => {
    const storedRating = localStorage.getItem(`alreadyRated_${item.id}`);
    return storedRating ? +avg : 0;
  });

  const [alreadyRated, setAlreadyRated] = useState<boolean>(() => {
    const storedAlreadyRated = localStorage.getItem(`alreadyRated_${item.id}`);
    return storedAlreadyRated ? JSON.parse(storedAlreadyRated) : false;
  });

  const updateRating = async (rating: number) => {
    try {
      await axios.patch(`http://localhost:3000/volunteers/${item.id}`, {
        ratings: [...item.ratings, rating],
      });
      fetchVolunteers();
      localStorage.setItem(`alreadyRated_${item.id}`, JSON.stringify(true));
    } catch (error) {
      console.error("Error updating rating: ", error);
      message.error("An error occurred while updating rating.");
    }
  };

  function handleSetRating(rating: number) {
    setRating(rating);
    updateRating(rating);
    setAlreadyRated(true);
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        {item.ratings && avg} ({total})
        <Rate
          tooltips={desc}
          onChange={(rating) => handleSetRating(rating)}
          value={rating}
          className="text-sm sm:text-lg lg:text-2xl"
          disabled={alreadyRated}
          style={{
            opacity: alreadyRated ? 0.3 : 1,
            cursor: alreadyRated ? "not-allowed" : "pointer",
          }}
        />
      </div>
      {alreadyRated && <p className="text-xs translate-x-4">Rated!</p>}
    </div>
  );
}
