import { Page } from "../common/pagination.model"
import { AnimeListModel, AnimeTrendModel } from "./anime.model"

export type AnimeHomeModel = {
  list: AnimeListModel & Page
  trend: {
    mediaTrends: AnimeTrendModel[]
  }
}