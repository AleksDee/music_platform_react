import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {
    
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const {picture, audio} = files
    return this.trackService.create(dto, picture[0], audio[0])
  }

  @Get()
  getAll(@Query('offset') query: string) {
    return this.trackService.search(query)
  }

  @Get('/search')
  search(@Query('count') count: number,
         @Query('offset') offset: number) {
    return this.trackService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id)
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id)
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto)
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen
  }
}
