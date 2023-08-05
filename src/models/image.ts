import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { thumbHeight, thumbWidth } from '../constants';

export interface IImagePath {
  id: number;
  url: string;
  alt: string;
}

export interface IThumbnail extends Pick<IImagePath, 'url'> {
  height: number;
  width: number;
}

export interface IImage extends IImagePath, IThumbnail {
  thumbnail?: IThumbnail;
}

export class ThumbnailModel implements IThumbnail {
  @ApiProperty({ enum: [thumbHeight] })
  public height: number;

  @ApiProperty()
  public url: string;

  @ApiProperty({ enum: [thumbWidth] })
  public width: number;
}

export class ImageModel implements IImage {
  @ApiProperty()
  public alt: string;

  @ApiProperty()
  public height: number;

  @ApiProperty()
  public id: number;

  @ApiPropertyOptional()
  public thumbnail: ThumbnailModel;

  @ApiProperty()
  public url: string;

  @ApiProperty()
  public width: number;
}
