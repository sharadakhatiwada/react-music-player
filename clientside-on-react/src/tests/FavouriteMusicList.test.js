import FavoriteMusicList from "../components/music/FavoriteMusicList";
import { render, screen } from "@testing-library/react";

it("fav music list should rerender and change the list output when props changed", () => {
  const favMusicList = [{ _id: 1, title: "hello music 1" }];
  const { rerender } = render(<FavoriteMusicList favMusic={favMusicList} />);

  expect(screen.getByTestId("1")).toHaveTextContent("hello music 1");

  favMusicList.push({ _id: 2, title: "hello music 2" });
  rerender(<FavoriteMusicList favMusic={favMusicList} />);
  expect(screen.getByTestId("2")).toHaveTextContent("hello music 2");
});
