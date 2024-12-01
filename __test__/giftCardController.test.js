import { giftCardController } from "../../controllers/sazzad/giftCardController.js";
import GiftCard from "../../models/sazzad/giftCardModel.js";

jest.mock("../../models/sazzad/giftCardModel.js"); // Mock the GiftCard model

// Sample mock data
const mockGiftCard = {
  code: "CARD123",
  balance: 100,
  expirationDate: "2024-12-31",
};

const mockGiftCards = [
  { code: "CARD123", balance: 100, expirationDate: "2024-12-31" },
  { code: "CARD456", balance: 200, expirationDate: "2025-01-01" },
];

describe("GiftCard Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("addGiftCard", () => {
    let req, res;

    beforeEach(() => {
      req = { body: mockGiftCard };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should successfully add a gift card", async () => {
      GiftCard.prototype.save = jest.fn().mockResolvedValue(mockGiftCard); // Mock successful save

      await giftCardController.addGiftCard(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Gift card added successfully",
        giftCard: mockGiftCard,
      });
      expect(GiftCard.prototype.save).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when adding a gift card", async () => {
      GiftCard.prototype.save = jest.fn().mockRejectedValue(new Error("Database error")); // Mock error

      await giftCardController.addGiftCard(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error adding gift card",
        error: "Database error",
      });
      expect(GiftCard.prototype.save).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if missing required fields", async () => {
      const invalidReq = { body: { ...mockGiftCard, balance: undefined } };
      const invalidRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await giftCardController.addGiftCard(invalidReq, invalidRes);

      expect(invalidRes.status).toHaveBeenCalledWith(400);
      expect(invalidRes.json).toHaveBeenCalledWith({
        message: "All fields (code, balance, expirationDate) are required",
      });
    });
  });

  describe("getGiftCards", () => {
    let req, res;

    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should retrieve all gift cards", async () => {
      GiftCard.find = jest.fn().mockResolvedValue(mockGiftCards); // Mock GiftCard.find

      await giftCardController.getGiftCards(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGiftCards);
      expect(GiftCard.find).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when retrieving gift cards", async () => {
      GiftCard.find = jest.fn().mockRejectedValue(new Error("Database error")); // Mock error

      await giftCardController.getGiftCards(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching gift cards",
        error: "Database error",
      });
      expect(GiftCard.find).toHaveBeenCalledTimes(1);
    });
  });
});
