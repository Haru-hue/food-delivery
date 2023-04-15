import { Icon } from "@iconify/react";

const Rating = ({ stars }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            className="text-2xl"
            icon="material-symbols:star-rounded"
            color={i < stars ? '#DFBE48' : 'lightgrey'}
          />
        ))}
      </div>
    );
};

export default Rating