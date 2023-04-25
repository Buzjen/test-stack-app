import { useEffect, useState } from "react";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import { RepoCard } from "../components/RepoCard";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: ReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropDown(debounced.length > 2 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropDown(false);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600 ">Something went wrong...</p>
      )}

      <div className="relative w-[500px]">
        <input
          type="text"
          className="border py-2 px-4 w-[42px] mb-2"
          placeholder="Search for username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropDown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center ">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {ReposLoading && <p className="text-center">Repos are Loading...</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
