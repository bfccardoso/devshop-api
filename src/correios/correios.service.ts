import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class CorreiosService {
  private token: string
  async getAddress(zipCode: string) {
    const url = `${process.env.CORREIOS_URL}/cep/v2/enderecos/${zipCode}`
    // Passo 1: Autenticação para obter o token de acesso
    if (!this.token) {
      await this.auth()
    }

    const headers = {
      Authorization: `Bearer ${this.token}`
    }

    try {
      const response = await axios.get(url, { headers })
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error(`Erro ao consultar CEP: ${error.message}`)
    }
  }
  async getDeliveryTime(
    productCode: string,
    destinationZipCode: string,
    date: string
  ) {
    const url = `${process.env.CORREIOS_URL}/prazo/v1/nacional/${productCode}?cepOrigem=${process.env.CEP}&cepDestino=${destinationZipCode}&dtEvento=${date}`
    // Passo 1: Autenticação para obter o token de acesso
    if (!this.token) {
      await this.auth()
    }
    console.log('url: ' + url)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    }

    try {
      const response = await axios.get(url, { headers })
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error(`Erro ao consultar prazo: ${error}`)
    }
  }

  /**
   * 'https://api.correios.com.br/preco/v1/nacional/04227?cepDestino=20911080&cepOrigem=37538578&psObjeto=300&tpObjeto=2&comprimento=24&largura=16&altura=4&dtEvento=02-02-2024'
   */
  async getShippingPrice(
    productCode: string,
    destinationZipCode: string,
    date: string,
    weight: number,
    objectType: number,
    length: number,
    width: number,
    height: number
  ) {
    const url = `${process.env.CORREIOS_URL}/preco/v1/nacional/${productCode}?cepDestino=${destinationZipCode}&cepOrigem=${process.env.CEP}&psObjeto=${weight}&tpObjeto=${objectType}&comprimento=${length}&largura=${width}&altura=${height}&dtEvento=${date}`
    // Passo 1: Autenticação para obter o token de acesso
    if (!this.token) {
      await this.auth()
    }
    console.log('url: ' + url)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    }

    try {
      const response = await axios.get(url, { headers })
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Error(`Erro ao consultar preço: ${error}`)
    }
  }

  private async auth() {
    const url = `${process.env.CORREIOS_URL}/token/v1/autentica/cartaopostagem`
    const credentials = Buffer.from(
      `${process.env.CNPJ}:${process.env.CORREIOS_SECRET_ACCESS_KEY}`
    ).toString('base64')
    const config = {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    }
    const body = {
      numero: `${process.env.CORREIOS_CARTAO_POSTAGEM}`
    }
    console.log('url: ' + url)
    try {
      const response = await axios.post(url, body, config)

      // Extrair o token de acesso da resposta da autenticação
      this.token = response.data.token
      console.log('token: ' + this.token)
    } catch (error) {
      console.error('Erro ao autenticar na API de terceiros:', error.message)
      throw new Error('Erro ao autenticar na API de terceiros')
    }
  }
}
