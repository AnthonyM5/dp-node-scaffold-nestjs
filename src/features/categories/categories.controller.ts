import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Version,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { mockCategories } from '../../mocks';
import { InternalServerErrorModel, NotFoundErrorModel } from '../../models';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Version('0')
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          imageUrl: { type: 'string' },
          backgroundColor: { type: 'string' },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorModel,
  })
  @Get()
  getAllCategories(): { categories: Array<Record<string, unknown>> } {
    return mockCategories;
  }

  @Version('0')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        imageUrl: { type: 'string' },
        backgroundColor: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: NotFoundErrorModel,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorModel,
  })
  @Get(':id')
  public getMockCategoryById(@Param('id') id: number): Record<string, unknown> {
    const category = mockCategories.categories.find(
      (category) => category.id === id
    );

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
