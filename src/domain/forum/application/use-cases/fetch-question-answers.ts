import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { IAnswersRepository } from "../repositories//answers-repository";

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}
interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );
    return {
      answers,
    };
  }
}
