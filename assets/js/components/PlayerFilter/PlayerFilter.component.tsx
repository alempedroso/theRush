import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiltersActions } from "../../store/filters/reducer";
import useStyles from "./PlayerFilter.styles";

export const PlayerFilter: React.FC = () => {
  const styles = useStyles();
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const updatePlayerNameFilter = () => {
    dispatch({
      type: FiltersActions.FILTER_PLAYER,
      payload: {
        player_name: name,
      },
    });
  };

  const onEnterDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updatePlayerNameFilter();
    }
  };

  return (
    <div className={styles.root}>
      <TextField
        onChange={changeHandler}
        label="Player's name"
        className={styles.input}
        onKeyDown={onEnterDown}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={updatePlayerNameFilter}
      >
        Search
      </Button>
    </div>
  );
};

export default PlayerFilter;
