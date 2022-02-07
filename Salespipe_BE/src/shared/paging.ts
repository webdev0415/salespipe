import { applyDecorators, Type as NestType } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      );
    });
  });
}

export enum UnitOfTime {
  minute = 'minute',
  hour = 'hour',
  day = 'day',
  month = 'month',
  year = 'year',
}

export enum ORDER_BY {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class OrderParam {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Field want to sort',
    example: 'createdAt',
    default: 'createdAt',
    type: String,
  })
  field: string;

  @IsEnum(ORDER_BY)
  @ApiProperty({
    description: 'Order in descending or ascending',
    example: 'DESC',
    default: 'DESC',
    type: String,
  })
  sort: 'DESC' | 'ASC';
}

export class PageQuery {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Page need to load',
    required: false,
    example: 2,
    default: 0,
    type: Number,
  })
  @Min(0)
  page = 0;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Number items per page',
    required: false,
    example: 10,
    default: 10,
    type: Number,
  })
  @Max(100)
  @Min(1)
  limit = 10;

  // @IsOptional()
  // @Type(() => OrderParam)
  // @ApiProperty({
  //     description: 'Order by',
  //     example: "+createdAt",
  //     default: "+createdAt",
  //     isArray: true,
  //     type: OrderParam
  // })
  // order: OrderParam[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Field want to sort',
    required: false,
    example: 'createdAt',
    default: 'createdAt',
    type: String,
  })
  sortBy = 'createdAt';

  @IsEnum(ORDER_BY)
  @IsOptional()
  @ApiProperty({
    description: 'Order in descending or ascending',
    required: false,
    example: 'DESC',
    default: 'DESC',
    type: String,
  })
  sortOrder: 'DESC' | 'ASC' = 'DESC';
}

export class DateRangeQuery {
  @IsDate()
  @ApiProperty({
    description: 'From date want to filter',
    example: '2021-05-10T01:45:36.077Z',
    type: Date,
  })
  fromDate: Date;

  @IsDate()
  @ApiProperty({
    description: 'To date want to filter',
    example: '2021-05-10T01:45:36.077Z',
    type: String,
  })
  toDate: Date;
}

export class TimeStepQuery {
  @IsEnum(UnitOfTime)
  @ApiProperty({
    description: 'Unit want to filter',
    example: 'day',
    enum: UnitOfTime,
  })
  unit: UnitOfTime;

  @IsPositive()
  @IsInt()
  @ApiProperty({
    description: 'Number of unit each step',
    example: 2,
    minimum: 1,
    type: Number,
  })
  @Transform((v) => parseInt(v.value, 10))
  value: number;
}

export class DateRangeStepQuery extends DateRangeQuery {
  @IsEnum(UnitOfTime)
  @ApiProperty({
    description: 'Unit want to filter',
    example: 'day',
    enum: UnitOfTime,
  })
  unit: UnitOfTime;

  @IsPositive()
  @IsInt()
  @ApiProperty({
    description: 'Number of unit each step',
    example: 2,
    minimum: 1,
    type: Number,
  })
  @Transform((v) => parseInt(v.value, 10))
  value: number;
}

export class PageQueryNoSort {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Page need to load',
    required: false,
    example: 2,
    default: 0,
    type: Number,
  })
  @Min(0)
  page = 0;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Number items per page',
    required: false,
    example: 10,
    default: 10,
    type: Number,
  })
  @Max(100)
  @Min(1)
  limit = 10;
}

export class SearchQuery extends PageQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'String want to search for',
    example: 'quận 3',
    default: '',
    type: String,
  })
  @Length(0, 40)
  s? = '';
}

export class SearchQueryNoSort extends PageQueryNoSort {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'String want to search for',
    example: 'quận 3',
    default: '',
    type: String,
  })
  @Length(0, 40)
  s? = '';
}

export class FindQuery<T> extends SearchQuery {
  where?: T;
}

export class PageResponse<Entity> {
  meta: {
    page: number;
    perPage: number;
  };

  data: Entity[];
}

export function createMysqlQuery<T>(query: FindQuery<T>) {
  const res: any = {};
  if (query) {
    if (query.where) res.where = query.where;
    if (query.limit) res.take = query.limit;
    if (query.page) res.skip = query.limit * query.page;
    if (query.sortBy) res.order = { [query.sortBy]: query.sortOrder };
  }

  return res;
}

export function createPageResponse<Entity>(
  query: FindQuery<Entity>,
  data: Entity[],
): PageResponse<Entity> {
  return {
    meta: {
      page: query.page,
      perPage: query.limit,
    },
    data,
  };
}

export const ApiPageResponse = <TModel extends NestType<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          meta: {
            type: 'object',
            properties: {
              page: { type: 'number' },
              perPage: { type: 'number' },
            },
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    }),
  );
};
