import { movieListController } from "../controllers/amit/movieListController.js";
import { MovieList } from "../models/amit/movieListModel.js";

// Mock the MovieList model
jest.mock("../models/amit/movieListModel");

describe("movieListController", () => {
  describe("getAllMovies", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.clearAllMocks(); // Clear previous mocks
    });

    it("should return all movies with status 200", async () => {
      const mockMovies = [
        {
          name: "Movie 1",
          year: "2021",
          category: "Action",
          type: "Feature",
          imageLink: "http://example.com/movie1.jpg",
        },
        {
          name: "Movie 2",
          year: "2020",
          category: "Comedy",
          type: "Feature",
          imageLink: "http://example.com/movie2.jpg",
        },
      ];

      MovieList.find.mockResolvedValue(mockMovies);

      await movieListController.getAllMovies(req, res);

      expect(MovieList.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockMovies,
      });
    });

    it("should handle errors and return status 500", async () => {
      const mockError = new Error("Database error");
      MovieList.find.mockRejectedValue(mockError);

      await movieListController.getAllMovies(req, res);

      expect(MovieList.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
      });
    });
  });
});